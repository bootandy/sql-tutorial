import QD from '../../components/QuestionDisplay'
import Heading from '../../components/PageLayout'

import {setupSql, initialCatsSql} from '../../components/Sql'


const correctSql = `
select * from cats where description not in ('fluffy') or description is null;
`    

const title = `How null behaves in WHERE queries`

const description = `
Our cats are jealous of the fluffy ones.

Select all cats that do not have the description 'fluffy'. 

Please do this by adding a WHERE condition based on the description
`

// message: null isn't included for not in or != 

export default function Q1() {
    return (
        <Heading>
            <QD setupSql={setupSql} initialSql={initialCatsSql} correctSql={correctSql} title={title} description={description}/> 
        </Heading>
    )
}
