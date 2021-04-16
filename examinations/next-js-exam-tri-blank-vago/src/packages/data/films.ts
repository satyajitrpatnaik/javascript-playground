import {
    LUKE_SKYWALKER,
    LEIA_ORGANA,
    R2_D2,
    HAN_SOLO,
    OBI_WAN,
    C_3PO,
    DARTH_VADER,
    CHEWBACCA,
} from './characters';
import { Film } from './types';

export const FILMS: Film[] = [
    {
        id: '1xx1',
        title: 'A New Hope',
        episodeID: 4,
        openingCrawl:
            "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        director: 'George Lucas',
        producers: ['Gary Kurtz', 'Rick McCallum'],
        releaseDate: '1977-05-25',
        characterConnection: {
            characters: [
                LUKE_SKYWALKER,
                LEIA_ORGANA,
                R2_D2,
                HAN_SOLO,
                OBI_WAN,
                C_3PO,
                DARTH_VADER,
                CHEWBACCA,
            ],
        },
    },
    {
        id: '1xx2',
        title: 'The Empire Strikes Back',
        episodeID: 5,
        openingCrawl:
            'It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....',
        director: 'Irvin Kershner',
        producers: ['Gary Kurtz', 'Rick McCallum'],
        releaseDate: '1980-05-17',
        characterConnection: {
            characters: [
                LUKE_SKYWALKER,
                LEIA_ORGANA,
                R2_D2,
                HAN_SOLO,
                OBI_WAN,
                C_3PO,
                DARTH_VADER,
                CHEWBACCA,
            ],
        },
    },
    {
        id: '1xx3',
        title: 'Return of the Jedi',
        episodeID: 6,
        openingCrawl:
            'Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...',
        director: 'Richard Marquand',
        producers: ['Howard G. Kazanjian', 'George Lucas', 'Rick McCallum'],
        releaseDate: '1983-05-25',
        characterConnection: {
            characters: [
                LUKE_SKYWALKER,
                LEIA_ORGANA,
                R2_D2,
                HAN_SOLO,
                OBI_WAN,
                C_3PO,
                DARTH_VADER,
                CHEWBACCA,
            ],
        },
    },
];
