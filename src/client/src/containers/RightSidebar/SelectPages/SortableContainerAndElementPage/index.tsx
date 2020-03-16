import * as React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import DraggableSidebarItem from "./DraggableSidebarPage";
import styles from "./styles.module.css";
import { ISelected } from "../../../../types/selected";

const SortableSidebarItem = SortableElement(
  ({
    page,
    idx,
    totalPageCount,
    maxInputLength
  }: {
    page: any;
    idx: number;
    maxInputLength?: number;
    totalPageCount: number;
  }) => {
    return (
      <DraggableSidebarItem
        page={page}
        maxInputLength={maxInputLength}
        idx={idx + 1}
        totalCount={totalPageCount}
      />
    );
  }
);

const SortableContainerPage = SortableContainer(
  ({
    pages,
    maxInputLength
  }: {
    pages: ISelected[];
    maxInputLength?: number;
  }) => {
    const totalPageCount = pages.length;
    return (
      <div className={styles.sidebarItem}>
        {pages.map((page: ISelected, idx: number) => {
          return (
            <SortableSidebarItem
              index={idx}
              idx={idx}
              page={page}
              maxInputLength={maxInputLength}
              totalPageCount={totalPageCount}
            />
          );
        })
        }
      </div>
    );
  }
);

export default SortableContainerPage;