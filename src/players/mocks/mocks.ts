import { APIPlayer, APIResponse, APIMeta } from '../interfaces/api.interfaces';

export const mock3: APIPlayer = {
  id: 8,
  first_name: 'Ali',
  last_name: 'Aldridge',
  weight_pounds: 250,
  height_feet: 6,
  height_inches: 11,
  position: 'F',
  team: {
    id: 24,
    abbreviation: 'SAS',
    city: 'San Antonio',
    conference: 'West',
    division: 'Southwest',
    full_name: 'San Antonio Spurs',
    name: 'Spurs',
  },
};
export const mock4: APIPlayer = {
  id: 6,
  first_name: 'LaMarcus',
  last_name: 'Aldridge',
  weight_pounds: 250,
  height_feet: 6,
  height_inches: 11,
  position: 'F',
  team: {
    id: 24,
    abbreviation: 'SAS',
    city: 'San Antonio',
    conference: 'West',
    division: 'Southwest',
    full_name: 'San Antonio Spurs',
    name: 'Spurs',
  },
};

export const metadata: APIMeta = {
  total_count: 2,
  per_page: 2,
  current_page: 1,
  total_pages: 1,
  next_page: 1,
};

export const APIResponseMock: APIResponse = {
  data: [mock4, mock3],
  meta: metadata,
};

// export const mock2 : Player = {
//     id: 6,
//     firstName: 'LaMarcus',
//     lastName: 'Aldridge',
//     position: 'F',
//     heightFeet: 6,
//     heightInches: 11,
//     weight_pounds: 250,
//     team: {
//         id: 24,
//         abbreviation: 'SAS',
//         city: 'San Antonio',
//         conference: 'West',
//         division: 'Southwest',
//         full_name: 'San Antonio Spurs',
//         name: 'Spurs',
//     }
// }

// export const dataToUpdate: Filter = {
// };

// export const invalidData = {
// };
