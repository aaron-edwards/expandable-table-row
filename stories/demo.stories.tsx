import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import * as faker from 'faker';

import ExpandableRow from '../src/expandable-row'
type Person = {
  name: string;
  email: string;
  company: string;
  image: string;
}

const createPerson = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  
  return {
    name: faker.name.findName(firstName, lastName),
    email: faker.internet.email(firstName, lastName),
    company: faker.company.bs(),
    image: faker.image.avatar()
  }
};

const Details = ({person}: {person: Person}) => <img src={person.image} />

storiesOf('Components', module).add(
  'Table',
  () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell/>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Company</TableCell>          
        </TableRow>
      </TableHead>
      <TableBody>
        {
          Array(10).fill(null,0,10)
            .map(createPerson)
            .map(person => <ExpandableRow expanded={<Details person={person}/>}>
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.company}</TableCell>
            </ExpandableRow>)
        }
      </TableBody>
    </Table>
  ),
);