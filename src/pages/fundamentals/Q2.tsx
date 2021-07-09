
import QD from '../../components/QuestionDisplay'
import Heading from '../../components/PageLayout'
import {setupSql, initialCatsSql} from '../../components/Sql'


const correctSql = `
      select 
count(1) filter (where description='fluffy') as fluffy ,
count(1) filter (where description='soft') as soft,
count(1) filter (where description='coarse') as coarse, 
count(1) filter (where description is null) as unknown 
from cats
`    

const title = `Using filter [A poor man's pivot]`

const description = `
Our cats want a table that counts their description

Select a count of cats by description, convert null into 'unknown'
`

export default function F2() {
    return (
        <Heading>
            <QD setupSql={setupSql} initialSql={initialCatsSql} correctSql={correctSql} title={title} description={description}/> 
        </Heading>
    )
}