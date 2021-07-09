import QD from '../../components/QuestionDisplay'
import Heading from '../../components/PageLayout'

import {setupSql} from '../../components/Sql'

const sql = setupSql + `

create table spending(id, name, year_2020, year_2021);
    insert into spending values(1, 'meowly cyrus', 100, 100);
    insert into spending values(2, 'clawdia', null, 0);
    insert into spending values(3, 'katy purry', 50, 0);
    insert into spending values(4, 'chairman meow', 100, null);
`;

const initialSql = `
select * from spending;
`    

// const correctSql = `
// select id, name, coalesce(year_2019, 0) + coalesce(year_2020, 0) as spend 
// from spending
// `

const correctSql = `
select avg(coalesce(year_2021, 0)) as spend 
from spending
`

const title = `Handling nulls in sums`

const description = `
Our cats want to find out how much has been spent on them 

Select the average spending for the year 2021
`


export default function Q3() {
    return (
        <Heading>
            <QD setupSql={sql} initialSql={initialSql} correctSql={correctSql} title={title} description={description}/> 
        </Heading>
    )
}
