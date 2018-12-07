import { ParticipantFormModule } from './participant-form.module';

describe('ParticipantFormModule', () => {
  let participantFormModule: ParticipantFormModule;

  beforeEach(() => {
    participantFormModule = new ParticipantFormModule();
  });

  it('should create an instance', () => {
    expect(participantFormModule).toBeTruthy();
  });
});
