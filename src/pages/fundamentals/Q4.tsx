
import QD from '../../components/QuestionDisplay'
import Heading from '../../components/PageLayout'
import {setupSql, initialCatLineageSql} from '../../components/Sql'

const correctSql = `
with recursive cte as (
   select id, name, mother_id, null as child, 0 as depth
   from cat_lineage where id = 6
   union all 
   select C.id, c.name, C.mother_id, p.name as child, depth+1
   from cat_lineage c  join  cte p on C.id = P.mother_id   
)                 
select child, name as mother, depth as generations from cte
where child is not null;
`    

const title = `Recursive CTEs: Fully recursive `

const description = `
We want to trace the lineage of our cat: 'catrick swayze', id = 8

Select this cat's parentage
`

export default function F4() {
    return (
        <Heading>
            <QD setupSql={setupSql} initialSql={initialCatLineageSql} correctSql={correctSql} title={title} description={description}/> 
        </Heading>
    )
}