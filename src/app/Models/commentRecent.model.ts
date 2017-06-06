export class CommentRecent {
  constructor(
    public slug          : string,
    public title         : string,
    public username      : string,
    public submission_id : number,
    public comment       : string,
    public created_at    : string,
    public date          : string
  ) {}
}
