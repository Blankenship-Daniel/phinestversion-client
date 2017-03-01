export class Vote {
  constructor(
    public submission_id  : number,
    public user_id        : string,
    public vote_type      : string
  ) {}
}
