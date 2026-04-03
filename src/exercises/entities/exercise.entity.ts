import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique('exercise_unique_constraints',['name'])
export class Exercise {
    @PrimaryGeneratedColumn()
    exerciseId : number

    @Column()
    name : string;

    @Column()
    force : string;

    @Column()
    level : string;

    @Column()
    mechanic : string;

    @Column()
    equipment : string

    @Column("simple-array")
    primaryMuscles: string[]

    @Column("simple-array")
    secondaryMuscles : string[]

    @Column("simple-array")
    instructions : string[]

    @Column()
    category : string

}
