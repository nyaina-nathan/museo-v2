-- Active: 1788028574315@@127.0.0.1@5432@museo
create table if not exists users(
    id uuid primary key default gen_random_uuid(),
    email varchar unique not null,
    password_hash varchar(100) not null,
    username varchar(100) not null unique,
    created_at timestamptz default now(),
    updated_at timestamptz
);

create table if not exists jerseys (
    id uuid primary key default gen_random_uuid(),
    name varchar not null,
    description text,
    is_public boolean default true,
    price int check(price > 0),
    created_at timestamptz default now(),
    updated_at timestamptz
);

create table if not exists jersey_images(
    id uuid primary key default gen_random_uuid(),
    id_jersey uuid not null references jerseys(id) on delete cascade,
    title text not null,
    url text not null
);