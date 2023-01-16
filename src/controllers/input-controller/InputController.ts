import { InputModel } from '@/models';
import { getErrorMessage, InputArgs } from '@/utils';
import { Request, Response } from 'express';

export const getInputController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inputs: InputArgs[] = await InputModel.find();
    console.log(inputs);
    res.status(200).json(inputs);
  } catch (error: any) {
    res.status(404).json({ message: getErrorMessage(error) });
  }
};

export const postInputController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const input = req.body;
  const newInput = new InputModel(input);

  try {
    await newInput.save();
    res.status(201).json(newInput);
  } catch (error) {
    res.status(209).json({ message: getErrorMessage(error) });
  }
};
