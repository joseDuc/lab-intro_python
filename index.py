
from flask import Flask, request, jsonify, render_template
import json
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/enviar', methods=['POST'])
def enviar():
    try:
        data=request.get_json()
        name = data.get('name', '')
        size=data.get('size', '')
        species=data.get('species','')
        if not name or not size or not species:
            return  jsonify({'message' : f'Faltan datos para guardar al habitante'})
        s=Snake(name,float(size),species)
        descargaHabitante(s)
        return jsonify({'message' : f'Se ha agregado la serpiente {s.name} de {s.size} mts de la especie {s.species}'})
    except Exception as e:
        return jsonify({'message': f"Error: {str(e)}"}), 500

@app.route('/listar', methods=['GET'])
def listar():
    return jsonify({'message' : cargaHabitantes()})

@app.route('/cargaAnimales', methods=['GET'])
def  cargaAnimales():
    try:
        animals=cargaHabitantes()
        return jsonify({f'message': animals})
    except Exception as e:
        return jsonify({'message':  f"SSSerror: {str(e)}"}),500
@app.route('/nombreTerrario',methods=['GET'])


def nombreTerrario():
    return ({'message':'Terrario del África'})
    
    
class Snake:
    def __init__(self, name,size,species):
        self.name=name
        self.size=size
        self.species=species

    def move(self):
        print (f"La serpiente {self.name} se desliza")
    
    
class Terrario:
    def __init__(self, name, width, long):
        self.name=name
        self.width=width
        self.long=long
        self.animals=[0]
        
    def agregaHabitante(self,snake):
        try:
            if type(snake) is Snake:
                self.animals.append(snake)
            else:
                print(f"El objeto {snake} no es una serpiente.")
            return self.animals[self.animals.len-1]
        except Exception as e:
            return (f'error agregando error: {e}')
        

    
    def muestraHabitantes(self):
        if not self.animals:
            print ("No hay habitantes")
        else:
            for s in self.animals:
                print(f'name:{s.name} size:{s.size} species:{s.species}')

    def area(self):
        return (float(self.width) * float(self.long))
    

   
def nombreDeArchivo():
    return "terrario.json"

def cargaHabitantes():
    if os.path.exists(nombreDeArchivo()):
        with open(nombreDeArchivo(), 'r') as f:
            animals= json.load(f)
            return animals
    else:
        return []
            
def descargaHabitantes(terrario):
    if terrario:
        with open(nombreDeArchivo(), 'w') as f:
            json.dump(terrario.animals, f, indent=4)
   
def descargaHabitante(snake):
    if snake:
        animals =cargaHabitantes()
       # animals.append(serpiente)
        animals.append({'name': snake.name, 'size': snake.size, 'species': snake.species})
            
        with open(nombreDeArchivo(), 'w') as f:
            json.dump(animals, f, indent=4)
   

def main():
    terrario = Terrario('África', 5.40, 7.60)
    terrario.agregaHabitante(Snake('Mamba Negra',4.5,'Elápido'))
    terrario.agregaHabitante(Snake('Pitón de Seba',6,'Pitónido'))
    terrario.agregaHabitante(Snake('Serpiente de Árbol del Gabón',2,'Viperido'))
    terrario.agregaHabitante(Snake('Cobra Egipcia',2.5,'Elápido'))
    terrario.agregaHabitante(Snake('Serpiente de Arena del Sáhara',4.5,'Viperido'))
    
    terrario.muestraHabitantes()

    
    print (f'Área del terrario: {terrario.area}')
    
   

    for a in terrario.animals:
        a.move()
    
    h=cargaHabitantes()
    if h:
        for s in h:
            terrario.agregaHabitante(s)
            
 #INICIO   
if __name__ == '__main__':
    app.run(debug=True)
    
    