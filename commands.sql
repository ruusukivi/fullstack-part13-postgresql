CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

insert into blogs (author, url, title) values ('Dan Abramov', 'https://overreacted.io/writing-resilient-components/', 'Writing Resilient Components');
insert into blogs (author, url, title) values ('Martin Fowler', 'https://martinfowler.com/articles/is-quality-worth-cost.html', 'Is High Quality Software Worth the Cost?');
insert into blogs (author, url, title) values ('Robert C. Martin', 'https://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html', 'FP vs. OO List Processing');