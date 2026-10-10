-- Seed data for local development.
-- Wipes all tables and reloads the content from the old src/data/*.js files.
-- Run after schema.sql:
--   docker compose exec -T db psql -U upahaar -d upahaar -v ON_ERROR_STOP=1 < db/seed.sql

BEGIN;

TRUNCATE members, images, events, stories RESTART IDENTITY CASCADE;


WITH e AS (
    INSERT INTO events (city, title, event_date, event_description)
    VALUES ('Manchester', 'The first donor registration drive', '2014-05-15 00:00:00', 'Upahaar proudly hosted its first-ever organ donation registration drive, marking an important step in our mission to save lives. The drive focused on raising awareness about the urgent need for organ donors, particularly within the South Asian community, while encouraging individuals to take the simple but life-changing step of joining the organ donor registry.

The event created a welcoming space for attendees to learn more about organ donation, ask questions, and hear real stories of families and lives transformed through the gift of donation. With the support of healthcare partners and community leaders, Upahaar helped break down common misconceptions and highlighted the true impact organ donors can have.

This milestone drive is just the beginning of many more to come. By inspiring more people to register, Upahaar is building a compassionate community rooted in hope, solidarity, and the belief that everyone has the power to give the gift of life.')
    RETURNING id
)
INSERT INTO images (image_url, event_id)
SELECT v.url, e.id
FROM e, (VALUES
    ('https://res.cloudinary.com/dyollfze8/image/upload/v1754989015/donation2_wqp2pz.webp', 0),
    ('https://res.cloudinary.com/dyollfze8/image/upload/v1754989015/donation1_mwfqgm.jpg', 1)
) AS v(url, position)
ORDER BY v.position;


WITH s AS (
    INSERT INTO stories (title, story_description, content)
    VALUES ('Aarav’s Second Chance', 'A young boy''s life was saved through an Upahaar donation.', 'Seven-year-old Aarav was like any other playful child in his village—full of energy, laughter, and dreams of becoming a cricketer. But when he was diagnosed with a rare blood disorder that required an urgent bone marrow transplant, his world turned upside down. His parents, unable to afford the expensive treatment, feared the worst.

That’s when Upahaar stepped in.

Through the generous donations of people who believed in giving the gift of life, Aarav received not only the financial support for his treatment but also hope. The funds raised through Upahaar helped cover the cost of his transplant, post-operative care, and medications. Volunteers from the program also provided emotional support to Aarav’s family, walking with them through every step of the journey.

Today, Aarav is back in school, laughing with his friends, and once again chasing cricket balls under the sun. His story is a shining example of how one act of giving—one Upahaar—can change a life forever.')
    RETURNING id
)
INSERT INTO images (image_url, story_id)
SELECT v.url, s.id
FROM s, (VALUES
    ('https://res.cloudinary.com/dyollfze8/image/upload/v1756569248/story1_zknikf.jpg', 0),
    ('https://res.cloudinary.com/dyollfze8/image/upload/v1756569250/story3_e11jeh.webp', 1)
) AS v(url, position)
ORDER BY v.position;

WITH s AS (
    INSERT INTO stories (title, story_description, content)
    VALUES ('Meena Walks Again', 'Your donation helped Meena walk again after a life-altering accident.', 'At just 9 years old, Meena was struck by a speeding vehicle on her way to school. The accident left her with multiple fractures and nerve damage in her legs. Her parents, daily wage workers, couldn’t afford the costly surgeries and long rehabilitation required for recovery.

With little time and hope, Upahaar donors came to the rescue. The community’s support paid for Meena’s critical surgery and a 6-month physiotherapy program. Not only was her physical healing funded, but Upahaar also covered transport and learning materials so Meena wouldn''t fall behind in school.

Today, Meena walks unaided, runs with her siblings, and dreams of becoming a doctor. Her recovery is a beautiful reminder that when people come together to give, even the most broken paths can lead to joyful new beginnings.')
    RETURNING id
)
INSERT INTO images (image_url, story_id)
SELECT v.url, s.id
FROM s, (VALUES
    ('https://res.cloudinary.com/dyollfze8/image/upload/v1756569250/story3_e11jeh.webp', 0),
    ('https://res.cloudinary.com/dyollfze8/image/upload/v1756569248/story1_zknikf.jpg', 1)
) AS v(url, position)
ORDER BY v.position;

WITH s AS (
    INSERT INTO stories (title, story_description, content)
    VALUES ('Ravi''s New Heartbeat', 'From illness to inspiration, Ravi’s heart surgery was made possible by Upahaar.', 'Ravi was born with a congenital heart defect that made even simple activities like walking exhausting. Doctors advised early surgery, but the cost was far beyond what his single mother could afford. Each passing day without treatment was a growing risk.

Thanks to compassionate Upahaar donors, Ravi received the life-saving heart surgery he desperately needed. The donation covered hospital bills, post-op medication, and nutritional support to help him regain strength. More than the money, it gave his mother peace and Ravi a future filled with possibility.

Now Ravi is 11, full of laughter and energy, and finally able to play outside with friends. His heart beats strong, echoing the kindness of those who gave to save him.')
    RETURNING id
)
INSERT INTO images (image_url, story_id)
SELECT v.url, s.id
FROM s, (VALUES
    ('/childeren-cancer.jpeg', 0),
    ('https://res.cloudinary.com/dyollfze8/image/upload/v1756569262/story2_udkrbq.jpg', 1)
) AS v(url, position)
ORDER BY v.position;

WITH s AS (
    INSERT INTO stories (title, story_description, content)
    VALUES ('Neha Finds Her Voice', 'Upahaar donors helped Neha overcome her speech impairment.', 'Neha had always been a bright child, but her severe speech delay kept her silent in class and isolated from her peers. Her parents, though loving and supportive, couldn''t afford the long-term therapy needed to help her find her voice.

Through Upahaar, Neha was enrolled in a professional speech therapy program. The donations funded weekly sessions, learning tools, and home support guides for her parents. Over the months, Neha progressed from barely speaking to confidently answering questions and reading aloud.

Today, she’s a bubbly 8-year-old who loves storytelling and dreams of becoming a teacher. Her journey shows that sometimes, the most powerful gift you can give is a voice to be heard.')
    RETURNING id
)
INSERT INTO images (image_url, story_id)
SELECT v.url, s.id
FROM s, (VALUES
    ('https://res.cloudinary.com/dyollfze8/image/upload/v1756569277/story4_jci2wi.jpg', 0),
    ('https://res.cloudinary.com/dyollfze8/image/upload/v1756569248/story1_zknikf.jpg', 1)
) AS v(url, position)
ORDER BY v.position;

WITH s AS (
    INSERT INTO stories (title, story_description, content)
    VALUES ('Akshay Beats Leukemia', 'Akshay''s fight against leukemia was won with help from Upahaar.', 'When Akshay was diagnosed with leukemia at age 8, his world turned into a blur of hospital visits, painful treatments, and emotional turmoil. His parents, devastated and financially overwhelmed, struggled to keep up with the growing medical bills.

That’s when Upahaar stepped in. Donations funded his chemotherapy, provided access to life-saving medications, and ensured he had proper nutrition during recovery. Beyond the financial support, the emotional backing from the Upahaar community gave Akshay and his parents the strength to keep going.

Now, Akshay is in remission. He’s back in school, enjoying football with his friends, and inspiring everyone around him with his bravery. His story is a beacon of hope for families facing medical crises without resources.')
    RETURNING id
)
INSERT INTO images (image_url, story_id)
SELECT v.url, s.id
FROM s, (VALUES
    ('https://res.cloudinary.com/dyollfze8/image/upload/v1756569262/story2_udkrbq.jpg', 0),
    ('/childeren-cancer.jpeg', 1)
) AS v(url, position)
ORDER BY v.position;


WITH img AS (INSERT INTO images (image_url) VALUES ('https://res.cloudinary.com/dyollfze8/image/upload/v1755795092/father_davis_bqezzm.jpg') RETURNING id)
INSERT INTO members (member_type, member_name, image_id, member_description)
SELECT 'patron', 'Father Davis Chiramel', img.id, 'Father Davis Chiramel, widely known as the Kidney Priest of India, is a respected social reformer and health activist who pioneered organ donation awareness. By donating his kidney to a fellow citizen, he inspired thousands. He has been instrumental in the inception and growth of Upahaar, serving as its Patron.'
FROM img;

WITH img AS (INSERT INTO images (image_url) VALUES ('https://res.cloudinary.com/dyollfze8/image/upload/v1755808540/siddiq_wmlflv.jpg') RETURNING id)
INSERT INTO members (member_type, member_name, image_id, member_description)
SELECT 'trustee', 'Dr Abubacker Siddiq Pulakal', img.id, 'Dr Abubacker Siddiq Pulakal is a Consultant in Respiratory and Sleep Medicine with over 25 years of clinical experience. Dr Pulakal completed his MBBS degree at Katsurba Medical College, India in 1991, after which he undertook a MD in Internal Medicine at Bangalore University, India, graduating in 1995. He then began practicing at Baby Memorial Hospital in Calicut, India, leaving in 1996. He later moved to the UK and was awarded his Membership with the Royal College of Physicians of London in 1997.'
FROM img;

WITH img AS (INSERT INTO images (image_url) VALUES ('https://res.cloudinary.com/dyollfze8/image/upload/v1758146789/WhatsApp_Image_2025-09-17_at_1.39.16_PM_t3x3qp.jpg') RETURNING id)
INSERT INTO members (member_type, member_name, image_id, member_description)
SELECT 'trustee', 'Mrs Jainy Chackochan', img.id, 'Jainy Chackochan is an accomplished healthcare professional currently serving as a Matron in Infection Prevention and Control at Manchester Foundation Trust. With a strong clinical background spanning adult and paediatric nursing, theatres, anaesthesia, recovery, ophthalmology, and neurosurgery, she brings a wealth of frontline expertise to her leadership role. She holds a postgraduate degree in Healthcare Ethics and Law from the University of Manchester, equipping her with a robust understanding of the ethical and legal dimensions of modern healthcare practice. Beyond her clinical and managerial contributions, Jainy is an active advocate for diversity, inclusion, and community engagement. She serves as a BAME Committee Member and a Women’s Forum Member at Manchester Foundation Trust, championing representation and equity within the healthcare workforce. Her commitment extends into the wider community as a Volunteer and Trustee of the UPAHAAR charity, and as an active member of Aspiring Senior Kerala Nurses (ASKeN). She also contributes to faith and cultural initiatives as the Secretary of Kudumbakootaima – Eparchy of Great Britain, Sero Malabar Rite.'
FROM img;

WITH img AS (INSERT INTO images (image_url) VALUES ('https://res.cloudinary.com/dyollfze8/image/upload/v1755808540/e00ed5d2-profile_Anasudhin_Azeez_Large_w8irxj.jpg') RETURNING id)
INSERT INTO members (member_type, member_name, image_id, member_description)
SELECT 'trustee', 'Mr Anasudhin Azeez', img.id, 'Mr Anasudhin Azeez is a media entrepreneur with 30 years experience in the industry as reporter, war correspondent, investigative journalist, editor and publisher. He won How-Do Newspaper of the year award in 2012 for Asian Lite . A smart victory against mainstream newspapers and regional titles.'
FROM img;

WITH img AS (INSERT INTO images (image_url) VALUES ('https://res.cloudinary.com/dyollfze8/image/upload/v1758044013/WhatsApp_Image_2025-09-16_at_6.31.53_AM_hudpyz.jpg') RETURNING id)
INSERT INTO members (member_type, member_name, image_id, member_description)
SELECT 'trustee', 'Dr. Agimol Pradeep BEM', img.id, 'Dr. Agimol Pradeep BEM is a Senior Transplant Coordinator at Kings College Hospital in London and a founding trustee of “Upahaar.” She completed her nursing studies in India and has been working in NHS care settings since 2001. As a philanthropist, she promotes awareness of organ and stem cell donation among Black and Asian Minority Ethnic (BAME) communities. In 2011, she received funding from the British Renal Society to pursue her PhD on ''Increasing organ donation in the North West South Asian community through targeted education.'' Her research positively impacted the community by understanding South Asians'' attitudes, health behaviors, and beliefs regarding organ donation and implementing specific educational initiatives to change their perspectives. Since 2010, she has closely collaborated with NHS Blood and Transplant (NHSBT) and Delete Blood Cancer (DKMS), in a volunteer capacity and serves as a member of the steering group for the Community Investment Scheme. Her significant contributions to promoting organ donation have been recognised nationally; she was awarded the British Empire Medal (BEM) in 2018 and named Nurse of the Year in 2015 by the British Journal of Nursing.'
FROM img;

WITH img AS (INSERT INTO images (image_url) VALUES ('https://res.cloudinary.com/dyollfze8/image/upload/v1755808539/498908544_10232064756054027_6487147603210700336_n_xaeblp.jpg') RETURNING id)
INSERT INTO members (member_type, member_name, image_id, member_description)
SELECT 'trustee', 'Mr Bejoy Sebastian', img.id, 'Mr. Bejoy Sebastian is a Kerala-born critical care nurse based in London, elected as the first Indian President of the Royal College of Nursing in 2024. Alongside leading UK nursing bodies, he''s passionate about advancing nursing both in the UK and in his home region of Kerala, recognized for his integrity, compassion, and transformative leadership.'
FROM img;

WITH img AS (INSERT INTO images (image_url) VALUES ('https://res.cloudinary.com/dyollfze8/image/upload/v1755016888/Screenshot_2025-08-04_at_4.49.27_PM_ncqtzh.png') RETURNING id)
INSERT INTO members (member_type, member_name, image_id, member_description)
SELECT 'trustee', 'Dr Zainul Aabideen', img.id, 'Zainul Aabideen is a passionate advocate for organ donation and has been instrumental in establishing Upahaar''s mission. With years of experience in healthcare administration, he brings valuable leadership to our organization.'
FROM img;

WITH img AS (INSERT INTO images (image_url) VALUES ('https://res.cloudinary.com/dyollfze8/image/upload/v1755808738/mehnaz_v5wz5n.jpg') RETURNING id)
INSERT INTO members (member_type, member_name, image_id, member_description)
SELECT 'volunteer', 'Mehnaz Aabideen', img.id, 'Final year medical student currently studying at Peninsula Medical School, the University of Plymouth. Alongside my studies, I enjoy teaching other medical students and volunteering for St John Ambulance. My interests lie in internal medicine specialties such as Nephrology and Haematology.'
FROM img;

WITH img AS (INSERT INTO images (image_url) VALUES ('https://res.cloudinary.com/dyollfze8/image/upload/v1758043528/WhatsApp_Image_2025-09-16_at_10.36.35_AM_ojdam6.jpg') RETURNING id)
INSERT INTO members (member_type, member_name, image_id, member_description)
SELECT 'volunteer', 'Mrs Shaly George', img.id, 'A band 7 Ward manager who works in critical care unit at Kent and Canterbury hospital'
FROM img;

WITH img AS (INSERT INTO images (image_url) VALUES ('https://res.cloudinary.com/dyollfze8/image/upload/v1758043697/WhatsApp_Image_2025-09-16_at_6.31.50_AM_jh7xzk.jpg') RETURNING id)
INSERT INTO members (member_type, member_name, image_id, member_description)
SELECT 'volunteer', 'Mrs. Annie Paliath', img.id, 'With over three decades of nursing experience, she currently serves as a Clinical Educator, combining her deep medical knowledge with a compassionate approach to patient care. Having spent 23 years in the UK, her life has been dedicated not only to healthcare but also to meaningful service within the community. Beyond her professional role, she has actively supported a range of charitable initiatives—donating hair to the Little Princess Trust, taking part in a charity skydive, and leading donation and stem cell awareness campaigns. She serves as an advisory board member of Mother''s Charity and, as a long-standing member of Upahaar, collaborates with organizations to drive positive change. Her journey reflects a lifelong commitment to service, education, and making a lasting impact in the lives of others'
FROM img;

WITH img AS (INSERT INTO images (image_url) VALUES ('https://res.cloudinary.com/dyollfze8/image/upload/v1758043958/WhatsApp_Image_2025-09-16_at_6.31.51_AM_x7vily.jpg') RETURNING id)
INSERT INTO members (member_type, member_name, image_id, member_description)
SELECT 'volunteer', 'Mrs. Tincy Jose', img.id, 'Tincy Jose is a Staff Nurse who works in Norfolk, originally from Kerala. Tincy completed her Bsc Nursing from J K college of Nursing Coimbatore 2000 April. She started her journey as a registered nurse on 01.09.2000 @ Bethany Medical Centre Anaikatty where her perception about the life has changed whilst witnessing the life realities of tribal communities in Attapadi. Tincy moved to England in 2008 and worked in a nursing home as RGN. Tincy joined her dream place of work NHS 2014 and where  she still continues her journey. Tincy attracted to UPHAAR Truust , whilst reading about it’s work several times but when she got a chance to speak with Dr Agimol her views made Tincy inspired further and conducted a drive January 2024 at her local community and became part of Upahaar family. Tincy lives with her husband and two boys in Cambridgeshire.'
FROM img;

WITH img AS (INSERT INTO images (image_url) VALUES ('https://res.cloudinary.com/dyollfze8/image/upload/v1758146831/WhatsApp_Image_2025-09-17_at_2.23.54_PM_uxoexx.jpg') RETURNING id)
INSERT INTO members (member_type, member_name, image_id, member_description)
SELECT 'volunteer', 'Mrs Sonia Antony', img.id, 'Sonia Antony is a dedicated registered nurse based in Newport with a strong commitment to both healthcare and community service. Since 2016, she has been a passionate volunteer with UPAHAAR, guided by her inspiring motto: “Fight against blood cancer – give someone a second chance at life.” Through her tireless efforts, Sonia has played a pivotal role in spreading awareness about blood stem cell donation and mobilising communities to take part in lifesaving initiatives. She has actively organised and supported donor registration drives across multiple cities, including Newport, Cardiff, Worcester, Birmingham, Coventry, and Merthyr. Her dedication has led to the successful registration of over 500 blood stem cell donors, with the majority coming from her hometown of Newport—a testament to her influence, persistence, and community spirit.'
FROM img;

COMMIT;
