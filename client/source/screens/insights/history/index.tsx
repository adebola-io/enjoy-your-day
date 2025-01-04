import { SourceCell } from '@adbl/cells';
import classes from './history.module.css';

export interface InsightHistoryProps {
  ref: SourceCell<HTMLDivElement | null>;
}

export function History(props: InsightHistoryProps) {
  return (
    <div ref={props.ref} class={classes.container}>
      History
    </div>
  );
}
