import { Column, Entity, PrimaryColumn } from "typeorm";
import crypto from 'crypto';

export enum PorjectStatus{
  Pending = 'peding',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed'
}


@Entity()
export class Project {

  @PrimaryColumn()
  id: string;
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({nullable: true, type: 'datetime'})
  started_at: Date | null;

  @Column({nullable: true, type: 'datetime'})
  cancelled_at: Date | null;

  @Column({nullable: true, type: 'datetime'})
  finished_at: Date | null;

  @Column({nullable: true, type: 'datetime'})
  forecasted_at: Date | null;

  @Column({type: 'simple-enum'})
  status: PorjectStatus = PorjectStatus.Pending;

  constructor(props: {
    name: String,
    description: string,
    started_at?: Date | null,
    cancelled_at?: Date | null,
    forecasted_at?: Date | null,
  }, 
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}
