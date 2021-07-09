
import QD from '../../components/QuestionDisplay'
import Heading from '../../components/PageLayout'

import {setupSql, initialCatsSql} from '../../components/Sql'

const correctSql = `
select description,
sum(case when color='black' then 1 else 0 end) as black,
sum(case when color='grey' then 1 else 0 end) as grey,
sum(case when color='white' then 1 else 0 end) as white,
 from cats
group by description
`
// This is the same as Q2

const title = `Using sum & case together`

const description = `
Our cats want a table that describes their description vs their colors.

Select a count of cats by description vs color
`

export default function F5() {
    return (
        <Heading>
            <QD setupSql={setupSql} initialSql={initialCatsSql} correctSql={correctSql} title={title} description={description}/> 
        </Heading>
    )
}