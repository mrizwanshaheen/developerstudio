from flask import Flask, jsonify
from routes.contact_routes import contact_bp
from routes.project_routes import project_bp
from routes.admin_routes import admin_bp

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(contact_bp, url_prefix='/api/contact')
app.register_blueprint(project_bp, url_prefix='/api/projects')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

@app.route('/')
def index():
    return jsonify({"message": "DeveloperStudio API is running", "status": "success"})

if __name__ == '__main__':
    app.run(debug=True)
