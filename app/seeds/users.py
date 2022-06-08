from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    Mary = User(
        username='Mary', email='mary@aa.io', password='password')
    Robert = User(
        username='Robert', email='robert@aa.io', password='password')
    John = User(
        username='John', email='john@aa.io', password='password')
    Linda = User(
        username='Linda', email='linda@aa.io', password='password')
    Michael = User(
        username='Michael', email='michael@aa.io', password='password')
    Jessica = User(
        username='Jessica', email='jessica@aa.io', password='password')
    Charles = User(
        username='Charles', email='charles@aa.io', password='password')
    Daniel = User(
        username='Daniel', email='daniel@aa.io', password='password')
    Sandra = User(
        username='Sandra', email='sandra@aa.io', password='password')  

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(Mary)
    db.session.add(Robert)
    db.session.add(John)
    db.session.add(Linda)
    db.session.add(Michael)
    db.session.add(Jessica)
    db.session.add(Charles)
    db.session.add(Daniel)
    db.session.add(Sandra)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
