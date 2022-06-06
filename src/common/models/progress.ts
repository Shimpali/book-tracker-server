export interface Progress {
  currentPosition: number;
  finalPosition: number;
  type: PositionType;
}

export enum PositionType {
  Percent = 'percent',
  Pages = 'pages',
}
