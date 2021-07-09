import QD from '../../components/QuestionDisplay'
import Heading from '../../components/PageLayout'

import {setupSql} from '../../components/Sql'


const initialSql = `
select * from toys;
select * from cats;
`    

const correctSql = `
select cats.id, cats.name, coalesce(sum(o.cost), 0) as toy_cost

from cats left join 
( select * from toys where date >= '2021-01-01') as o
on cats.id = o.cat_id

group by cats.id, cats.name
`    

const title = `How to handle join tables with missing entries`

const description = `
Our cats want to list themselves and the cost of their newest toys 

Select all cats and the amount spent on toys purchased in the year 2021
`

// message: Need the left join with a subquery


export default function Q2() {
    return (
        <Heading>
            <QD setupSql={setupSql} initialSql={initialSql} correctSql={correctSql} title={title} description={description}/> 
        </Heading>
    )
}
