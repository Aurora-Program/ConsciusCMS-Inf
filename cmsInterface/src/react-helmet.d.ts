declare module 'react-helmet' {
  import * as React from 'react';

  interface HelmetProps {
    children?: React.ReactNode;
  }

  export class Helmet extends React.Component<HelmetProps> {}
}
