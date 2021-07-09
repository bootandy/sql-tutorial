import QD from '../../components/QuestionDisplay'
import Heading from '../../components/PageLayout'

import {setupSql} from '../../components/Sql'

const sql = setupSql + `
    create table cat_locations(cat_id, city);
    insert into cat_locations values(2, 'berlin');
    insert into cat_locations values(3, 'paris');
    insert into cat_locations values(null, 'amsterdam');

`

const initialSql = `
select * from toys;
select * from cat_locations;
`    

const correctSql = `
SELECT t.id, t.name, t.cat_id, t.date, t.cost
FROM toys t where not exists ( select 1 from cat_locations cl where cl.cat_id = t.cat_id)
`    

const title = `Use of exists to handle nulls`

const description = `
Our cats want to find the toys owned by cats in an unknown location

Select all toys that are owned by cats not in the cat_locations table

Please use the cat_locations table in your query.
`


export default function Q5() {
    return (
        <Heading>
            <QD setupSql={sql} initialSql={initialSql} correctSql={correctSql} title={title} description={description}/> 
        </Heading>
    )
}
