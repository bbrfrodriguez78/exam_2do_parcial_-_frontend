from flask import Flask, render_template

def crear_app():
    app = Flask(__name__)

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/lista')
    def lista_ingredientes():
        return render_template('lista_ingredientes.html')
    return app

if __name__ == '__main__':
    app = crear_app()
    app.run(port=5000)