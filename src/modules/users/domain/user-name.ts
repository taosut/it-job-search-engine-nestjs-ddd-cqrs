import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

interface UserNameProps {
  value: string;
}

export class UserName extends ValueObject<UserNameProps> {
  public static maxLength = 15;
  public static minLength = 2;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserNameProps) {
    super(props);
  }

  public static create(props: UserNameProps): Result<UserName> {
    const usernameResult = Guard.againstNullOrUndefined(
      props.value,
      'username',
    );
    if (!usernameResult.succeeded) {
      return Result.fail(usernameResult);
    }

    const minLengthResult = Guard.againstAtLeast({
      numChars: this.minLength,
      argument: props.value,
      argumentPath: 'userName',
    });
    if (!minLengthResult.succeeded) {
      return Result.fail(minLengthResult);
    }

    const maxLengthResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentPath: 'userName',
    });
    if (!maxLengthResult.succeeded) {
      return Result.fail(minLengthResult);
    }

    return Result.ok(new UserName(props));
  }
}
