import QD from '../../components/QuestionDisplay'
import Heading from '../../components/PageLayout'

import {setupSql} from '../../components/Sql'


const initialSql = `
select * from toys;
`    

const correctSql = `
SELECT sum(cost)
FROM toys
WHERE date BETWEEN '2020-01-01' AND '2020-12-31';
`    

const title = `How to use BETWEEN in dates`

const description = `
Our cats want to find the sum cost of all toys purchased in 2020.

Select total cost of toys spent on toys purchased in 2020.

Please use: WHERE date BETWEEN
`

// BETWEEN is inclusive of dates go up to 2020-12-31 not to 2021-01-01


export default function Q4() {
    return (
        <Heading>
            <QD setupSql={setupSql} initialSql={initialSql} correctSql={correctSql} title={title} description={description}/> 
        </Heading>
    )
}
