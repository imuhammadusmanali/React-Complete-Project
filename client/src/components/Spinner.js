import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const Spinner = () => {
  return (
    <ClipLoader
      className="spinner"
      css={override}
      color={'#495057'}
      size={35}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
