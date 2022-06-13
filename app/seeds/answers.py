from app.models import db, Answer


def seed_answers():
    a1_to_q1 = Answer(
        content="Look into your baby's eyes and smile in response to his smiles. You should see your baby react positively to your facial expressions, movements and gestures.", 
        user_id='2', 
        question_id='1')
    
    a2_to_q1 = Answer(
        content="Talk to your baby in soft tones and 'baby talk'. Both the father, mother and other caregivers should communicate with the newborn. You will notice that she can hear and will soon start memorizing and copying your words.", 
        user_id='3', 
        question_id='1')
    
    a3_to_q1 = Answer(
        content="Place your baby on her tummy and shake a rattle or bell in front of her. Slowly lift the rattle just a little and encourage her to lift her head and shoulders to watch it move. Doing so helps your baby follow the rattle with her eyes, and practice lifting her head and shoulders.", 
        user_id='4', 
        question_id='1')

    a4_to_q1 = Answer(
        content="Gently soothe, stroke and hold your child. You will see your baby comforted, happy to be held and cuddled.", 
        user_id='5', 
        question_id='1')

    a5_to_q1 = Answer(
        content="Do skin to skin contact. Feeling, hearing and smelling your presence should provide your baby with a sense of calm and security.", 
        user_id='6', 
        question_id='1')
 
    a1_to_q2 = Answer(
        content="Lol…She doesn't know what hate is. First thing you need to do is relax. Newborns can pick up on your emotions, so if you are tense and worried when holding her, it's going to upset her. Find a nice, comfy spot to sit and hold her and just relax. Understand, babies cry. Just hold her and talk to her while smiling at her. And if you are calm, she will calm down. Just make sure she's not hungry, needs to burp, is too hot or cold, has a dirty diaper, or any other problems. And sometimes, babies just cry. Relax and smile. She loves you.", 
        user_id='7', 
        question_id='2')   

    a2_to_q2 = Answer(
        content="Might be sensory overload. My oldest daughter was a preemie and prolonged direct eye contact was too much for her. Until her nervous system was stabilized, I made sure that anyone holding her knew to snuggle her against their body, keep noise to a minimum, and not engage in eye-to-eye conversation. She was much more comfortable being held and hearing my heartbeat and breathing.", 
        user_id='8', 
        question_id='2')  

    a3_to_q2 = Answer(
        content="She doesn't hate you. She's a baby. She don't even know what that means.", 
        user_id='9', 
        question_id='2')  

    a4_to_q2 = Answer(
        content="Pleas speak with your pediatrician or a sage experienced woman for assistance. An infant cannot hate. Something else is afoot so reach out. Warmest wishes.", 
        user_id='10', 
        question_id='2')  

    a1_to_q3 = Answer(
        content="Lisa", 
        user_id='10', 
        question_id='3')  
    
    a2_to_q3 = Answer(
        content="Margaret", 
        user_id='12', 
        question_id='3')  
    
    a3_to_q3 = Answer(
        content="Marry", 
        user_id='2', 
        question_id='3')  

    a1_to_q6 = Answer(
        content="Try something like a plastic cup. You should see her try to grab or touch it.", 
        user_id='10', 
        question_id='6')  

    a1_to_q5 = Answer(
        content='Place her on her stomach and slowly walk your fingers toward her. Then quickly and gently tickle her saying: “here come my fingers, here they come, closer and closer, they got you”.', 
        user_id='8', 
        question_id='5')  

    a2_to_q5 = Answer(
        content='To change the game, make your fingers creep slowly or quickly, or wait different amounts of time before tickling her. You should see her show delight by laughing or squealing.', 
        user_id='9', 
        question_id='5')  

    a1_to_q10 = Answer(
        content='Play hide and seek with your infant.', 
        user_id='3', 
        question_id='10')     
    
    

    db.session.add(a1_to_q1)
    db.session.add(a2_to_q1)
    db.session.add(a3_to_q1)
    db.session.add(a4_to_q1)
    db.session.add(a5_to_q1)
    db.session.add(a1_to_q2)
    db.session.add(a2_to_q2)
    db.session.add(a3_to_q2)
    db.session.add(a4_to_q2)
    db.session.add(a1_to_q3)
    db.session.add(a2_to_q3)
    db.session.add(a3_to_q3)
    db.session.add(a1_to_q6)
    db.session.add(a1_to_q5)
    db.session.add(a2_to_q5)
    db.session.add(a1_to_q10)
        

    db.session.commit()


def undo_answers():
    db.session.execute('TRUNCATE answers RESTART IDENTITY CASCADE;')
    db.session.commit()