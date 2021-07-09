
import QD from '../../components/QuestionBackwards'
import Heading from '../../components/PageLayout'


const setupSql = `
      create table product_q2_correct(id, description, factory_id);
      insert into product_q2_correct values(1, 'thing', 1);
      insert into product_q2_correct values(2, 'widget', 2);
      insert into product_q2_correct values(3, 'toy', 2);

      create table factory_q2_correct(factory_id, cost);
      insert into factory_q2_correct values(1, 10);
      insert into factory_q2_correct values(2, 12);
      insert into factory_q2_correct values(2, 5);

      create table product_q2(id, description, factory_id);
      insert into product_q2 values(1, 'thing', 1);
      insert into product_q2 values(2, 'widget', 2);
      insert into product_q2 values(3, 'toy', 2);

      create table factory_q2(factory_id, cost);
      insert into factory_q2 values(1, 10);
      insert into factory_q2 values(2, 12);

`

const initialSql = `
-- insert into factory_q2 values();
`
const correctSql = [
    `SELECT id, description,
      (SELECT cost
       FROM factory_q2_correct AS B
       WHERE B.factory_id = A.factory_id order by cost asc) AS cost
FROM product_q2_correct AS A;
`,
    `SELECT id, description,
      (SELECT cost
       FROM factory_q2_correct AS B
       WHERE B.factory_id = A.factory_id order by cost desc) AS cost
FROM product_q2_correct AS A;
`,
];

const baseSelect = `select * from product_q2; 
select * from factory_q2;`

const title = `Insert puzzle 2`

const description = `
Insert some rows into the factory_q2 table such that running the 'desired output' queries below gives the desired output

Note: This trick will cause most databases to error on running the query. But Sqlite allows it.
`

export default function B2() {
    return (
        <Heading>
            <QD baseSelect={baseSelect} setupSql={setupSql} initialSql={initialSql} correctSql={correctSql} title={title} description={description}/> 
        </Heading>
    )
}
