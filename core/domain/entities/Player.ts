/**
 * Entidad del Jugador
 * Representa al usuario que está jugando
 */
export interface Player {
  id: string;
  name: string;
  createdAt: Date;
}

export class PlayerEntity implements Player {
  constructor(
    public id: string,
    public name: string,
    public createdAt: Date = new Date()
  ) {}

  static create(name: string): PlayerEntity {
    return new PlayerEntity(crypto.randomUUID(), name);
  }
}
