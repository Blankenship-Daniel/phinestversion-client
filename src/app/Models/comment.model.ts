export class Comment {
  constructor(
    public id            : number,
    public submission_id : number,
    public comment       : string,
    public created_at    : string,
    public user_id       : number,
    public username      : string,
    public user_image    : string
  ) {}
}
