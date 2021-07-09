
import QD from '../../components/QuestionBackwards'
import Heading from '../../components/PageLayout'
import { countBy } from 'lodash';


const setupSql = `
      create table q3_correct(id, name, description);
      insert into q3_correct values(1,	'meowly cyrus',	'fluffy');
      insert into q3_correct values(2,	'clawdia',	'soft');
      insert into q3_correct values(3,	'katy purry',	null);
      insert into q3_correct values(4,	'chairman meow', 'fluffy');

      create table q3(id, name, description);
      insert into q3 values(1	,'meowly cyrus',	'fluffy');
      insert into q3 values(2	,'clawdia',	'soft');
      insert into q3 values(3	,'katy purry',	'coarse');
      insert into q3 values(4	,'chairman meow', 'fluffy');
`

const initialSql = `
-- insert into q3 values();
`
const correctSql = [
    `SELECT * from q3_correct where description != 'fluffy'
`,
    `SELECT count(1) from q3_correct where description = 'fluffy'
`,
];

const baseSelect = `select * from q3; `

const title = `Update puzzle 3`

const description = `
Update a row(s) in the q3 table such that running the 'desired output' queries below gives the desired output

`

export default function B3() {
    return (
        <Heading>
            <QD baseSelect={baseSelect} setupSql={setupSql} initialSql={initialSql} correctSql={correctSql} title={title} description={description}/> 
        </Heading>
    )
}
