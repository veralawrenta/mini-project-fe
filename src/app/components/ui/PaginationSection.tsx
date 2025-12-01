import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationMeta } from "@/types/pagination";

interface PaginationSectionProps {
  meta: PaginationMeta;
  onClick: (page: number) => void;
}

const PaginationSection = (props: PaginationSectionProps) => {
  const { meta, onClick } = props;

  const handlePrev = () => {
    const totalPage = Math.ceil(meta.total / meta.take);

    if (meta.page > 1) {
      onClick(meta.page - 1);
    }
  };

  const handleNext = () => {
    const totalPage = Math.ceil(meta.total / meta.take);

    if (meta.page < totalPage) {
      onClick(meta.page + 1);
    }

  };

  return (
    <Pagination className="mt-2 text-primary text-2xl">
      <PaginationContent>
        <PaginationItem >
          <PaginationPrevious onClick={handlePrev}/>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink isActive>{meta.page}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationSection;
