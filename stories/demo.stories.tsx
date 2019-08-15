import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import * as faker from 'faker';

const createPerson = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  
  return {
    name: faker.name.findName(firstName, lastName),
    email: faker.internet.email(firstName, lastName),
    company: faker.company.bs(),
  }
};

storiesOf('Components', module).add(
  'Table',
  () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Company</TableCell>          
        </TableRow>
      </TableHead>
      <TableBody>
        {
          Array(10).fill(null,0,10)
            .map(createPerson)
            .map(person => <TableRow>
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.company}</TableCell>
            </TableRow>)
        }
      </TableBody>
    </Table>
  ),
);