interface ParagraphProps {
  setting: any;
}

function Paragraph({ setting }: ParagraphProps) {
  return <p className="pb-1 pt-3 text-gray">{setting.value}</p>;
}

export default Paragraph;
