from flask import Flask, request, jsonify, render_template
import json
import os

terrario=''

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/enviar', methods=['POST'])
def enviar():
    try:
        data=request.get_json()
        nombre = data.get('name', '')
        medida=data.get('size', '')
        especie=data.get('species','')
        if not nombre or not medida or not especie:
            return  jsonify({'mensaje' : f'Faltan datos para guardar al habitante'})
        s=Serpiente(nombre,float(medida),especie)
        descargaHabitante(s)
        return jsonify({'mensaje' : f'Se ha agregado la serpiente {s.nombre} de {s.medida} mts de la especie {s.especie}'})
    except Exception as e:
        return jsonify({'mensaje': f"Error: {str(e)}"}), 500

@app.route('/listar',methods=['GET'])
def listar():
    return jsonify({'mensaje' : cargaHabitantes()})

class Serpiente:
    def __init__(self, nombre,medida,especie):
        self.nombre=nombre
        self.medida=medida
        self.especie=especie

    def deslizar(self):
        print (f"n/La serpiente {self.nombre} se desliza")
    
    
class Terrario:
    def __init__(self, nombre,ancho,largo):
        self.nombre=nombre
        self.ancho=ancho
        self.largo=largo
        self.habitantes=[]
        
    def agregaHabitante(self,serpiente):
        try:
            if not isinstance(serpiente,Serpiente):
                print(f"n/El objeto {serpiente} no es una serpiente.")
            else:
                self.habitantes.append(serpiente)
                return self.habitantes[self.habitantes.len-1]
        except Exception as e:
            return (f'error agregando error: {e}')
        
        
    def muestraHabitantes(self,):
        if not self.habitantes:
            print ("n/No hay habitantes")
        else:
            for h in self.habitantes:
                print(f"n/nombre: {h.nombre} medida: {h.medida} especie: {h.especie}")
    
    def area(self):
        return self.ancho*self.largo
    

   
def nombreDeArchivo():
    return "terrario.json"

def cargaHabitantes():
    if os.path.exists(nombreDeArchivo()):
        with open(nombreDeArchivo(), 'r') as f:
                habitantes= json.load(f)
                return habitantes
    else:
        return []
            
def descargaHabitantes(terrario):
    if terrario:
        with open(nombreDeArchivo(), 'w') as f:
            json.dump(terrario.habitantes, f, indent=4)
   
def descargaHabitante(serpiente):
    if serpiente:
        habitantes =cargaHabitantes()
       # habitantes.append(serpiente)
        habitantes.append({'nombre': serpiente.nombre, 'medida': serpiente.medida, 'especie': serpiente.especie})
            
        with open(nombreDeArchivo(), 'w') as f:
            json.dump(habitantes, f, indent=4)
   

def main():
    terrario = Terrario('África', 5.40, 7.60)

    terrario.agregaHabitante(Serpiente('Mamba Negra',4.5,'Elápido'))
    terrario.agregaHabitante(Serpiente('Pitón de Seba',6,'Pitónido'))
    terrario.agregaHabitante(Serpiente('Serpiente de Árbol del Gabón',2,'Viperido'))
    terrario.agregaHabitante(Serpiente('Cobra Egipcia',2.5,'Elápido'))
    terrario.agregaHabitante(Serpiente('Serpiente de Arena del Sáhara',4.5,'Viperido'))
    
    terrario.muestraHabitantes()
    
    print (f"n/Área del terrario: {terrario.area}")
    
    habitantes = terrario.habitantes
    for s in habitantes:
        s.desliza()
    
    h=cargaHabitantes()
    if h:
        for s in h:
            terrario.agregaHabitante(s)
            
 #INICIO   
if __name__ == '__main__':
    app.run(debug=True)
    
    