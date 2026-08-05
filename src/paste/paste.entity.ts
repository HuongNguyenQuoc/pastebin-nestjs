import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('pastes')
export class Paste {
  @PrimaryColumn({ type: 'char', length: 7 })
  shortlink: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int', nullable: true, name: 'expiration_length_in_minutes' })
  expirationLengthInMinutes: number | null;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
