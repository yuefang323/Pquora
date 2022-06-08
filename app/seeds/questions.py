from app.models import db, Question


def seed_questions():
    question1 = Question(
        content='Any tips to take care of a newborn?', 
        owner_id='1', 
        tag_id='1')
    
    question2 = Question(
        content='My newborn baby girl always cries when I hold her. What should I do? I think she hates me.', 
        owner_id='2', 
        tag_id='1')
    
    question3 = Question(
        content="What's the most popular name of a newborn baby girl?", 
        owner_id='3', 
        tag_id='1')

    question4 = Question(
        content="Did you know? 1-3 month old babies see things best when they are between 20-30 cm away. By 3 months, babies have a greater range of vision.", 
        owner_id='4', 
        tag_id='2')

    question5 = Question(
        content='How to play a game with your 1 month old baby?', 
        owner_id='2', 
        tag_id='2')

    question6 = Question(
        content='How to encourage your 2 month old baby to reach for a safe object?', 
        owner_id='5', 
        tag_id='2')

    question7 = Question(
        content='Did you know if a 6 month old baby can eat honey?', 
        owner_id='7', 
        tag_id='3')

    question8 = Question(
        content='Any tips to take care of a 6-9 month old baby?', 
        owner_id='8', 
        tag_id='3')

    question9 = Question(
        content='Any tips to take care of a 9-12 month old baby?', 
        owner_id='9', 
        tag_id='4')

    question10 = Question(
        content='Any games to play with a 9-12 month old baby?', 
        owner_id='11', 
        tag_id='4')

    question11 = Question(
        content='Can baby walk when he is only 10 month old?', 
        owner_id='10', 
        tag_id='4')

    question12 = Question(
        content='Any tips to take care of a 1-2 year old toddler?', 
        owner_id='12', 
        tag_id='5')


    db.session.add(question1)
    db.session.add(question2)
    db.session.add(question3)
    db.session.add(question4)
    db.session.add(question5)
    db.session.add(question6)
    db.session.add(question7)
    db.session.add(question8)
    db.session.add(question9)
    db.session.add(question10)
    db.session.add(question11)
    db.session.add(question12)

    db.session.commit()


def undo_questions():
    db.session.execute('TRUNCATE questions RESTART IDENTITY CASCADE;')
    db.session.commit()