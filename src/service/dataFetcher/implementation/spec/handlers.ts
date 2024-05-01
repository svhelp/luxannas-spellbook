import { http, HttpResponse } from 'msw'
import { corruptedJsonMock, dianaContentMock, mfContentMock } from './constants';
 
export const handlers = [
    http.get('https://raw.communitydragon.org/latest/game/data/characters/wrong_diana/wrong_diana.bin.json', () => {
      return HttpResponse.json({error: "Not found"}, {status: 404})
    }),
    http.get('https://raw.communitydragon.org/latest/game/data/characters/wrong_morgana/wrong_morgana.bin.json', () => {
      return HttpResponse.error()
    }),
    http.get('https://raw.communitydragon.org/latest/game/data/characters/morgana/morgana.bin.json', () => {
      return new HttpResponse(corruptedJsonMock, {
        headers: {
            'Content-Type': 'text/plain',
        }
      })
    }),
    http.get('https://communitydragon-custom.org/missfortune/missfortune.bin.json', () => {
      return HttpResponse.json(mfContentMock)
    }),
    http.get('https://raw.communitydragon.org/latest/game/data/characters/diana/diana.bin.json', () => {
      return HttpResponse.json(dianaContentMock)
    }),
]