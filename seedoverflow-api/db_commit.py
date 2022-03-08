from app import app, db, User

app.app_context().push()
db.create_all()

user = User(email="admin@admin.com", password="jwoeiejfoiewf", first_name="Admin", last_name="User", username="Admin2")

db.session.add(user)
db.session.commit()