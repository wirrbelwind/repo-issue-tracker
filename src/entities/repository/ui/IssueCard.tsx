import {
  Card,
  CardFooter,
  CardHeader,
  Fade,
  Flex,
  Link,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IoMdArrowRoundUp } from "react-icons/io";

interface IssueCardProps {
  id: number;
  URL: string;
  title: string;
  createdAt: Date;
  authorName: string;
  commentsQuantity: number;
  serialNumber: number;
  parent: string;
}

export const IssueCard = ({
  URL,
  authorName,
  commentsQuantity,
  createdAt,
  id,
  serialNumber,
  title,
  parent,
}: IssueCardProps) => {
  const drop = useDroppable({
    id: id,
    data: {
      type: "Issue",
      parent,
    },
  });

  const drag = useDraggable({
    id: id,
    data: {
      parent,
    },
  });

  const headerText = `#${serialNumber} ${title} opened ${formatDistance(createdAt, Date.now())} ago`;

  const footerText = `${authorName} | Comments: ${commentsQuantity}`;

  return (
    <Card
      border="1px dashed"
      cursor="grab"
      {...drag.listeners}
      {...drag.attributes}
      ref={drag.isDragging ? drag.setNodeRef : drop.setNodeRef}
      transform={CSS.Translate.toString(drag.transform)}
      borderColor={drop.isOver ? "pink" : "black"}
      borderWidth="3px"
    >
      <Fade in={drop.isOver}>
        <Flex justifyContent="center">
          <IoMdArrowRoundUp size="2rem" />
        </Flex>
      </Fade>

      <CardHeader>
        <Link href={URL} fontWeight="bold">
          {headerText}
        </Link>
      </CardHeader>

      <CardFooter>{footerText}</CardFooter>
    </Card>
  );
};
