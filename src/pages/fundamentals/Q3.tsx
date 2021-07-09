
import QD from '../../components/QuestionDisplay'
import Heading from '../../components/PageLayout'

import {setupSql, initialCatLineageSql} from '../../components/Sql'


const correctSql = `
with org as (
select id, name, mother_id, 'Unknown' as 'mum' 
from cat_lineage where mother_id is null

union all

select c.id, c.name, c.mother_id, c2.name as 'mum' 
from cat_lineage c inner join org c2 
WHERE c.mother_id = c2.id
)
select * from org
order by id;
`    

const title = `Recursive CTEs: Simple`

const description = `
Our cats want to study their lineage.

Select a cat's name and their mother.
`

export default function F3() {
    return (
        <Heading>
            <QD setupSql={setupSql} initialSql={initialCatLineageSql} correctSql={correctSql} title={title} description={description}/> 
        </Heading>
    )
}