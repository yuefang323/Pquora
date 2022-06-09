from app.models import db, Tag


def seed_tags():
    tag1 = Tag(tag_name='newborn')
    tag2 = Tag(tag_name='1-6 months')
    tag3 = Tag(tag_name='6-9 months')
    tag4 = Tag(tag_name='9-12 months')
    tag5 = Tag(tag_name='1-2 years')

    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)
    db.session.add(tag5)

    db.session.commit()


def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()