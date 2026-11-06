begin;

alter table jerseys
    add column if not exists fr_description text,
    add column if not exists en_description text;

update jerseys
set en_description = description
where en_description is null;

alter table jerseys
    drop column if exists description;

commit;
