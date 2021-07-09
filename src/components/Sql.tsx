

export const setupSql = `
      create table cats(id, name, color, description);
      insert into cats values(1, 'meowly cyrus', 'black',  'fluffy');
      insert into cats values(2, 'clawdia', 'black', 'soft');
      insert into cats values(3, 'katy purry', 'black', 'coarse');
      insert into cats values(4, 'chairman meow', 'white', 'fluffy');
      insert into cats values(5, 'mystic mog', 'grey', 'soft');
      insert into cats values(6, 'cooking fat', 'white', 'patchy');
      insert into cats values(7, 'fidel catstro', 'grey', 'patchy');
      insert into cats values(8, 'catrick swayze', 'grey', null);

      create table cat_lineage(id, name, mother_id);
      insert into cat_lineage values(1, 'meowly cyrus', 7);
      insert into cat_lineage values(2, 'clawdia', null);
      insert into cat_lineage values(3, 'katy purry', 2);
      insert into cat_lineage values(4, 'chairman meow', 3);
      insert into cat_lineage values(5, 'mystic mog', 3);
      insert into cat_lineage values(6, 'cooking fat', 5);
      insert into cat_lineage values(7, 'fidel catstro', null);
      insert into cat_lineage values(8, 'catrick swayze', 6);

      create table toys(id, name, cat_id, date, cost);
      insert into toys values(1, 'scratchpad', 1, '2020-09-01', 10);
      insert into toys values(2, 'fake mouse', 2, '2020-12-31', 5);
      insert into toys values(3, 'real mouse', 3, '2021-01-01', 15);
      insert into toys values(4, 'cat bed', 1, '2021-02-01', 8);
      insert into toys values(5, 'laser pointer', 3, '2021-06-01', 2);
      insert into toys values(6, 'catnip', 4, '2021-07-01', 16);
`;


export const initialCatsSql = `
select * from cats
`    

export const initialCatLineageSql = `
select * from cat_lineage
`    