interface Props {
  comment: string;
}
const Comment: React.FC<Props> = ({ comment }) => {
  return <p> {comment} </p>;
};
export default Comment;
