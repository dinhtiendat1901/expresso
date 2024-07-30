create table profile_group
(
    id    TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
                                          substr(hex(randomblob(2)), 2) || '-' ||
                                          substr('AB89', abs(random()) % 4 + 1, 1) ||
                                          substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)))),
    name  VARCHAR(100) not null,
    color VARCHAR(20)  not null
);

CREATE TABLE profile
(
    id       TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
                                             substr(hex(randomblob(2)), 2) || '-' ||
                                             substr('AB89', abs(random()) % 4 + 1, 1) ||
                                             substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)))),
    name     VARCHAR(100) not null,
    path     TEXT         not null,
    group_id text         not null,
    foreign key (group_id) references profile_group (id)
);


create table script
(
    id   TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
                                         substr(hex(randomblob(2)), 2) || '-' ||
                                         substr('AB89', abs(random()) % 4 + 1, 1) ||
                                         substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)))),
    name varchar(100) not null,
    path text         not null
);



create table config
(
    id   INTEGER primary key,
    path TEXT,
    check (id = 1)
);




