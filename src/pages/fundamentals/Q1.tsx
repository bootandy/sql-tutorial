
import QD from '../../components/QuestionDisplay'
import Heading from '../../components/PageLayout'
import {setupSql, initialCatsSql} from '../../components/Sql'


// Fundamentals: coalesce

const correctSql = `
select count(1), coalesce(description, 'unknown') c
from cats group by c
`    

const title = `Using coalesce & group by`

const description = `
Our cats want to group themselves by their description

Select a count of cats by description, convert null into 'unknown'
`

export default function F1() {
    return (
        <Heading>
            <QD setupSql={setupSql} initialSql={initialCatsSql} correctSql={correctSql} title={title} description={description}/> 
        </Heading>
    )
}
