
import QD from '../../components/QuestionBackwards'
import Heading from '../../components/PageLayout'


const setupSql = `
      create table q1_correct(id, cost);
      insert into q1_correct values(1, 10);
      insert into q1_correct values(2, 90);
      insert into q1_correct values(3, null);

      create table q1(id, cost);
      insert into q1 values(1, 10);
`
const initialSql = `
--insert into q1 values()
`
// Need to hide table name
const correctSql = [
    `select sum(cost) / count(1) as av1 from q1_correct;`,
    `select avg(cost) as av2 from q1_correct;`
];

const title = `Insert puzzle`

const description = `
Insert some rows into the q1 table such that running the 'desired' queries below gives the desired output
`

export default function B1() {
    return (
        <Heading>
            <QD baseSelect="select * from q1" setupSql={setupSql} initialSql={initialSql} correctSql={correctSql} title={title} description={description}/> 
        </Heading>
    )
}
