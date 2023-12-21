-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS cinemas_id_seq;

-- Table Definition
CREATE TABLE "public"."cinemas" (
    "id" int4 NOT NULL DEFAULT nextval('cinemas_id_seq'::regclass),
    "movie_id" int8,
    "name" varchar(200),
    "city" varchar(250),
    "addres" varchar(250),
    "show_times" jsonb,
    "price" int8,
    "logo" text
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS months_id_seq;

-- Table Definition
CREATE TABLE "public"."months" (
    "id" int4 NOT NULL DEFAULT nextval('months_id_seq'::regclass),
    "name" varchar
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS movies_id_seq;

-- Table Definition
CREATE TABLE "public"."movies" (
    "id" int4 NOT NULL DEFAULT nextval('movies_id_seq'::regclass),
    "name" varchar(200),
    "release_date" date,
    "duration" varchar(100),
    "genres" jsonb,
    "directed_by" varchar,
    "casts" jsonb,
    "synopsis" text,
    "poster" text
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS order_history_id_seq;

-- Table Definition
CREATE TABLE "public"."order_history" (
    "id" int4 NOT NULL DEFAULT nextval('order_history_id_seq'::regclass),
    "movie_id" int8,
    "cinema_id" int8,
    "user_id" int8,
    "created_at" date,
    "movie_started" date,
    "seat" json,
    "barcode_url" text
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS payments_id_seq;

-- Table Definition
CREATE TABLE "public"."payments" (
    "id" int4 NOT NULL DEFAULT nextval('payments_id_seq'::regclass),
    "name" varchar(200),
    "logo" text
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS seats_id_seq;

-- Table Definition
CREATE TABLE "public"."seats" (
    "id" int4 NOT NULL DEFAULT nextval('seats_id_seq'::regclass),
    "seat_a" json,
    "seat_b" json,
    "seat_c" json,
    "seat_d" json,
    "seat_e" json,
    "seat_f" json,
    "seat_g" json
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "first_name" varchar(100),
    "last_name" varchar(100),
    "phone_number" varchar(20),
    "email" varchar(100),
    "password" varchar(250),
    "photo_profile" text
);

INSERT INTO "public"."cinemas" ("id", "movie_id", "name", "city", "addres", "show_times", "price", "logo") VALUES
(1, 2, 'CGV Cinemas Miko Mall', 'Bandung', 'Jl. Kopo Cirangrang No. 599 Kota Bandung', '["10.45am", "01.00pm", "03.15pm"]', 10, 'https://4.bp.blogspot.com/-rbQNzCVzyTc/WqIg6JwbgTI/AAAAAAAAINA/43qAdN2h6OcgTWF7qVjv08zuGunYpDlCgCLcBGAs/s1600/cgv.jpg');
INSERT INTO "public"."cinemas" ("id", "movie_id", "name", "city", "addres", "show_times", "price", "logo") VALUES
(2, 7, 'CGV Cinemas Paris van Java', 'Bandung', 'Jl. Sukajadi No. 137-139 Kota Bandung', '["10.45am", "01.00pm", "03.15pm"]', 15, 'https://4.bp.blogspot.com/-rbQNzCVzyTc/WqIg6JwbgTI/AAAAAAAAINA/43qAdN2h6OcgTWF7qVjv08zuGunYpDlCgCLcBGAs/s1600/cgv.jpg');




INSERT INTO "public"."movies" ("id", "name", "release_date", "duration", "genres", "directed_by", "casts", "synopsis", "poster") VALUES
(9, 'Doctor Strange in the Multiverse of Madness', '2022-05-02', '2 hours 6 minutes', '["Action", "Adventure", "Fantasy"]', 'Sam Raimi', '["Benedict Cumberbatch", "Elizabeth Olsen", "Chiwetel Ejiofor"]', 'Following the events of Spider-Man No Way Home, Doctor Strange unwittingly casts a forbidden spell that accidentally opens up the multiverse. With help from Wong and Scarlet Witch, Strange confronts various versions of himself as well as teaming up with the young America Chavez while traveling through various realities and working to restore reality as he knows it. Along the way, Strange and his allies realize they must take on a powerful new adversary who seeks to take over the multiverse.', 'https://e1.pxfuel.com/desktop-wallpaper/974/698/desktop-wallpaper-doctor-strange-in-the-multiverse-of-madness-poster-ultra-mobile-dr-strange-mobile.jpg');
INSERT INTO "public"."movies" ("id", "name", "release_date", "duration", "genres", "directed_by", "casts", "synopsis", "poster") VALUES
(2, 'The Lion King', '2019-07-09', '1 hour 58 minutes', '["Adventure", "Drama", "Family"]', 'Jon Favreau', '["Donald Glover", "Beyonce", "Seth Rogen"]', 'In Africa, the lion cub Simba is the pride and joy of his parents King Mufasa and Queen Sarabi. Mufasa prepares Simba to be the next king of the jungle. However, the naive Simba believes in his envious uncle Scar that wants to kill Mufasa and Simba to become the next king. He lures Simba and his friend Nala to go to a forbidden place and they are attacked by hyenas but they are rescued by Mufasa. Then Scar plots another scheme to kill Mufasa and Simba but the cub escapes alive and leaves the kingdom believing he was responsible for the death of his father. Now Scar becomes the king supported by the evil hyenas while Simba grows in a distant land. Sometime later, Nala meets Simba and tells that the kingdom has become a creepy wasteland. What will Simba do?', 'https://www.digitalmovieempire.com/wp-content/uploads/2020/03/The-Lion-King-2019.jpg');
INSERT INTO "public"."movies" ("id", "name", "release_date", "duration", "genres", "directed_by", "casts", "synopsis", "poster") VALUES
(3, 'John Wick: Chapter 3 - Parabellum', '2019-05-17', '2 hours 10 minutes', '["Action", "Crime", "Thriller"]', 'Chad Stahelski', '["Keanu Reeves", "Halle Berry", "Ian McShane"]', 'In this third installment of the adrenaline-fueled action franchise, skilled assassin John Wick (Keanu Reeves) returns with a $14 million price tag on his head and an army of bounty-hunting killers on his trail. After killing a member of the shadowy international assassin''''s guild, the High Table, John Wick is excommunicado, but the world''''s most ruthless hit men and women await his every turn.', 'https://e0.pxfuel.com/wallpapers/617/571/desktop-wallpaper-john-wick-chapter-3-parabellum-john-wick-cool.jpg');
INSERT INTO "public"."movies" ("id", "name", "release_date", "duration", "genres", "directed_by", "casts", "synopsis", "poster") VALUES
(4, 'Black Widow', '2020-11-06', '2 hours 14 minutes', '["Action", "Adventure", "Sci-Fi"]', 'Cate Shortland', '["Scarlett Johansson", "Florence Pugh", "David Harbour"]', 'In Marvel Studios'''' action-packed spy thriller "Black Widow," Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.', 'https://m.media-amazon.com/images/M/MV5BZGRlNTY3NGYtM2YzZS00N2YyLTg0ZDYtNmY2ZDg2NDM3N2JlXkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_.jpg'),
(5, 'The Witches', '2020-10-22', '1 hour 46 minutes', '["Adventure", "Comedy", "Family"]', 'Robert Zemeckis', '["Anne Hathaway", "Octavia Spencer", "Stanley Tucci"]', 'Reimagining Roald Dahl''''s beloved story for a modern audience, Robert Zemeckis''''s visually innovative film tells the darkly humorous and heartwarming tale of a young orphaned boy who, in late 1967, goes to live with his loving Grandma in the rural Alabama town of Demopolis. As the boy and his grandmother encounter some deceptively glamorous but thoroughly diabolical witches, she wisely whisks him away to a seaside resort. Regrettably, they arrive at precisely the same time that the world''''s Grand High Witch has gathered her fellow cronies from around the globe-undercover-to carry out her nefarious plans. Zemeckis is joined by a world-class team of filmmakers, including Alfonso Cuarón, Guillermo del Toro and Kenya Barris. The cast includes powerhouse performances from Anne Hathaway, Octavia Spencer, Stanley Tucci, Kristin Chenoweth and Chris Rock, with newcomer Jahzir Kadeen Bruno as the brave young hero.', 'https://m.media-amazon.com/images/M/MV5BNjRkYjlhMjEtYzIwOC00ZWYzLTgyMmQtYjI5M2UzNDJkNTU2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg'),
(6, 'Tenet', '2020-09-03', '2 hours 30 minutes', '["Action", "Sci-Fi", "Thriller"]', 'Christopher Nolan', '["John David Washington", "Robert Pattinson", "Elizabeth Debicki"]', 'In a twilight world of international espionage, an unnamed CIA operative, known as The Protagonist, is recruited by a mysterious organization called Tenet to participate in a global assignment that unfolds beyond real time. The mission: prevent Andrei Sator, a renegade Russian oligarch with precognitive abilities, from starting World War III. The Protagonist will soon master the art of "time inversion" as a way of countering the threat that is to come.', 'https://wallpapercave.com/wp/wp6824715.jpg'),
(7, 'Interstellar', '2014-10-26', '2 hours 49 minutes', '["Adventure", "Drama", "Sci-Fi"]', 'Christopher Nolan', '["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]', 'Earth''''s future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind''''s survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life.', 'https://w0.peakpx.com/wallpaper/438/840/HD-wallpaper-interstellar-2014-movie-poster.jpg'),
(8, 'Hello World', '2019-09-20', '1 hour 37 minutes', '["Animation", "Comedy", "Drama"]', 'Tomohiko Ito', '["Haruka Fukuhara", "Minami Hamabe", "Takumi Kitamura"]', 'A man travels in time from the year 2027 to relive his school years and to correct a bad decision.', 'https://m.media-amazon.com/images/M/MV5BOGIwYjZlOTctZTNhOC00OTdiLWI5ZWItOTdiMWRjMjUwMDlhXkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_.jpg'),
(10, 'The Walking Dead', '2010-10-31', '44 minutes', '["Drama", "Horror", "Thriller"]', 'Frank Darabont', '["Andrew Lincoln", "Norman Reedus", "Melissa McBride"]', 'Sheriff Deputy Rick Grimes gets shot and falls into a coma. When awoken he finds himself in a Zombie Apocalypse. Not knowing what to do he sets out to find his family, after he''''s done that, he gets connected to a group to become the leader. He takes charge and tries to help this group of people survive, find a place to live and get them food. This show is all about survival, the risks and the things you''''ll have to do to survive.', 'https://m.media-amazon.com/images/M/MV5BZmU5NTcwNjktODIwMi00ZmZkLTk4ZWUtYzVjZWQ5ZTZjN2RlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg'),
(1, 'Spider-Man: Homecoming', '2017-06-28', '2 hours 13 minutes', '["Adventure", "Action", "Sci-Fi"]', 'Jon Watss', '["Tom Holland", "Michael Keaton", "Robert Downey Jr."]', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened.', 'https://cdn.wallpapersafari.com/27/56/uZ4z6d.jpg');







INSERT INTO "public"."users" ("id", "first_name", "last_name", "phone_number", "email", "password", "photo_profile") VALUES
(1, 'Rayhan', 'Ilham', '08978574952', 'rayhangt89@gmail.com', 'iniPassword', 'https://png.pngtree.com/element_our/png_detail/20181102/avatar-profile-logo-vector-emblem-illustration-modern-illustration-png_227485.jpg');
INSERT INTO "public"."users" ("id", "first_name", "last_name", "phone_number", "email", "password", "photo_profile") VALUES
(2, 'budi', 'setiabudi', '08978564552', 'budiaja@gmail.com', 'iniPasswordBudi', 'https://png.pngtree.com/element_our/png_detail/20181102/avatar-profile-logo-vector-emblem-illustration-modern-illustration-png_227485.jpg');
INSERT INTO "public"."users" ("id", "first_name", "last_name", "phone_number", "email", "password", "photo_profile") VALUES
(4, 'Sasuke', 'Uchiha', '08978335552', 'sasukegaul@gmail.com', '$2b$15$pOh0VMtV8NesvAkZ0/gnqu6gqqRZzwcnOOyA62Jtd4bR.rhzDqC.G', 'https://png.pngtree.com/element_our/png_detail/20181102/avatar-profile-logo-vector-emblem-illustration-modern-illustration-png_227485.jpg');
INSERT INTO "public"."users" ("id", "first_name", "last_name", "phone_number", "email", "password", "photo_profile") VALUES
(7, 'Sasuke', 'Uchiha', '08978335552', 'sasuke@gmail.com', '$2b$15$NFR/WDkJKffXsz0Yw3D.euAIgZ9GyovHkP9AZ/TJw/6oh4HdQmnmS', 'https://png.pngtree.com/element_our/png_detail/20181102/avatar-profile-logo-vector-emblem-illustration-modern-illustration-png_227485.jpg'),
(8, 'Minato', 'Namikaze', '08978335552', 'minatogaul@gmail.com', '$2b$15$q1sncu9pJE20FXsYVtMWCu1FlmyZvo7SC29KbNdj3RGomF/CaI6Zm', 'https://png.pngtree.com/element_our/png_detail/20181102/avatar-profile-logo-vector-emblem-illustration-modern-illustration-png_227485.jpg'),
(9, 'Uzumaki', 'Naruto', '08978335552', 'narutogaul@gmail.com', '$2b$15$OGsmesOLuG2WRR8249wvcuE3h9V3cSu8XdvP4ouX6OrOYwKRnd.9W', 'https://png.pngtree.com/element_our/png_detail/20181102/avatar-profile-logo-vector-emblem-illustration-modern-illustration-png_227485.jpg'),
(13, 'Shisui', 'Uchiha', '08978335552', 'shisuigaul@gmail.com', '$2b$15$cCMowRsFpDJV0HYN8OhsxurvrJJSuFn.3SAeKWUGXewtXS.FmiXsa', 'https://png.pngtree.com/element_our/png_detail/20181102/avatar-profile-logo-vector-emblem-illustration-modern-illustration-png_227485.jpg');
